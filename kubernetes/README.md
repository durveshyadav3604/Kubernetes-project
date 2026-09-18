# Bags & Luggage — Kubernetes Deployment

This project deploys the Bags & Luggage application to Kubernetes. It has three parts: a React frontend, a Node/Express backend, and a MongoDB database.

We use two tools to manage this:
- **External Secrets Operator (ESO)** — gets database credentials from AWS Secrets Manager and saves them as a Kubernetes Secret.
- **MongoDB Community Operator** — creates and manages the MongoDB replica set (a group of database servers that copy each other's data for safety).

## Architecture

```
                        ┌─────────────────────────┐
   Internet ───────────▶│   ALB (Ingress)         │
                        └───────────┬─────────────┘
                          /api      │      /
                    ┌───────────────┴───────────────┐
                    ▼                                ▼
            ┌───────────────┐                ┌───────────────┐
            │  backend-svc   │                │ frontend-svc   │
            │  (ClusterIP)   │                │  (ClusterIP)   │
            └───────┬────────┘                └───────┬────────┘
                    ▼                                ▼
            ┌───────────────┐                ┌───────────────┐
            │  backend Pods  │                │ frontend Pods  │
            │  (Express :5000)│               │ (Nginx :80)    │
            └───────┬────────┘                └────────────────┘
                    ▼
            ┌────────────────────┐
            │  mongodb-svc         │  (headless)
            │  MongoDBCommunity RS │  (3 members)
            └──────────┬───────────┘
                       ▼
              AWS Secrets Manager
              (bags-luggage/mongodb)
              via ExternalSecret + SecretStore
```

## Files in this project

| File | What it does |
|---|---|
| `secret-store.yaml` | Tells ESO how to connect to AWS Secrets Manager (using the `external-secrets-sa` service account) |
| `external-secret.yaml` | Copies the `username` and `password` from AWS Secrets Manager (`bags-luggage/mongodb`) into a Kubernetes Secret called `mongo-sec` |
| `mongodb-community.yaml` | Creates a MongoDB replica set with 3 members. Uses the password from `mongo-sec`. After it starts, it also creates its own Secret with a ready-made connection string (`mongodb-admin-admin`) |
| `configmap.yaml` | Stores simple, non-secret settings for the backend: `PORT` and `SERVER_URL` |
| `backend.yaml` | Creates the backend Deployment and Service (`backend-svc`, port 5000). Gets `MONGO_URI` from the MongoDB Secret, and `PORT`/`SERVER_URL` from the ConfigMap |
| `frontend.yaml` | Creates the frontend Deployment and Service (`frontend-svc`, port 80). Runs Nginx to serve the React app |
| `ingress.yaml` | Creates an AWS ALB (Application Load Balancer) that sends `/api` traffic to the backend and everything else to the frontend |

## Before you start

Make sure these things already exist in the cluster:

1. **MongoDB Community Operator** is installed. Check with:
   ```bash
   kubectl get crd | grep mongodbcommunity
   ```
2. **External Secrets Operator** is installed.
3. **AWS Load Balancer Controller** is installed (needed for the Ingress to create a real load balancer):
   ```bash
   kubectl get deploy -n kube-system aws-load-balancer-controller
   ```
4. The `external-secrets-sa` service account already exists in the `bags-luggage` namespace (it was created manually on the jump server). This file is not part of this project — check with your team if you're not sure it's there:
   ```bash
   kubectl get sa external-secrets-sa -n bags-luggage
   ```
5. An `ecr-registry-secret` exists in `bags-luggage`, so Kubernetes can pull images from ECR. This token expires after 12 hours, so it may need to be refreshed:
   ```bash
   kubectl create secret docker-registry ecr-registry-secret \
     --docker-server=264284392886.dkr.ecr.ap-south-1.amazonaws.com \
     --docker-username=AWS \
     --docker-password=$(aws ecr get-login-password --region ap-south-1) \
     -n bags-luggage
   ```
6. The MongoDB username and password are saved in AWS Secrets Manager:
   ```bash
   aws secretsmanager create-secret \
     --name bags-luggage/mongodb \
     --secret-string '{"username":"admin","password":"Dy@12345"}' \
     --region ap-south-1
   ```

## How to apply the files (order matters)

We apply files in this order because each step depends on the one before it: the password Secret must exist before MongoDB starts, and MongoDB must be running before the backend can connect to it.

```bash
kubectl create namespace bags-luggage   # only if it doesn't exist yet

kubectl apply -f secret-store.yaml
kubectl apply -f external-secret.yaml
kubectl apply -f mongodb-community.yaml

# Wait until all 3 MongoDB pods are Running and Ready. This can take a few minutes.
kubectl get pods -n bags-luggage -l app=mongodb -w

kubectl apply -f configmap.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
```

## How to check everything is working

```bash
# See all resources in the namespace
kubectl get all -n bags-luggage

# Check that ESO successfully copied the AWS secret
kubectl get externalsecret mongo-sec -n bags-luggage

# Find the connection-string Secret created by the MongoDB operator
kubectl get secrets -n bags-luggage | grep mongodb

# Read the actual connection string (already correctly formatted)
kubectl get secret mongodb-admin-admin -n bags-luggage \
  -o jsonpath='{.data.connectionString\.standard}' | base64 -d

# Get the public address of the load balancer
kubectl get ingress bags-luggage-ingress -n bags-luggage
```

## Common problems to watch out for

- **`REACT_APP_API_URL` only works at build time, not at runtime.** React reads this value when the app is built (`npm run build`) and puts it directly into the JavaScript files. Setting it as a normal environment variable in `frontend.yaml` will not work. You must pass it when building the Docker image:
  ```bash
  docker build --build-arg REACT_APP_API_URL=https://<your-domain>/api -t <repo>:<tag> .
  ```
- **The MongoDB username is not automatically taken from the Secret.** Only the password comes from `mongo-sec`. The username in `mongodb-community.yaml` (`spec.users[].name`) must be typed in by hand, and it must match the username saved in AWS Secrets Manager.
- **Try not to write the MongoDB connection string by hand.** The operator creates one for you (`connectionString.standard`), and it already encodes special characters in the password correctly. If you do write one yourself, remember that symbols like `@` must be written as `%40`.
- **ECR image pulls need `imagePullSecrets`.** The login token from `aws ecr get-login-password` only lasts 12 hours, so you will need a way to refresh it if this runs for a long time.
- **The ALB Ingress only works if the AWS Load Balancer Controller is installed.** Without it, the Ingress will be created but nothing will actually happen — no load balancer, no public address.