# Incident Bot Console Helm Chart

A Helm chart for deploying Incident Bot Console (web interface) to Kubernetes.

https://docs.incidentbot.io/installation/#helm

## Configuration

| Parameter                         | Description                                                                                                        | Default                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `affinity`                        | Affinity configuration for the `Deployment`.                                                                       | `{}`                               |
| `deploymentAnnotations`           | Annotations to apply to the `Deployment`.                                                                          | `{}`                               |
| `envFromSecret.enabled`           | Whether or not to mount environment variables in the main process containers and init containers using a `Secret`. | `false`                            |
| `envFromSecret.secretName`        | The name of the `Secret` to use if setting `envFromSecret.enabled` to `true`.                                      | `null`                             |
| `envVars`                         | Variables in the format `KEY: value` to supply to the main process containers.                                     | `{}`                               |
| `extraContainers`                 | A list of raw `yaml` specifying any additional containers to create alongside the main one.                        | `[]`                               |
| `healthCheck.enabled`             | Whether or not to enable the health check for the main process container.                                          | `true`                             |
| `healthCheck.path`                | The path to use for the health check.                                                                              | `/api/v1/health`                   |
| `healthCheck.scheme`              | The health check scheme.                                                                                           | `HTTP`                             |
| `healthCheck.initialDelaySeconds` |                                                                                                                    | `10`                               |
| `healthCheck.periodSeconds`       |                                                                                                                    | `30`                               |
| `healthCheck.timeoutSeconds`      |                                                                                                                    | `1`                                |
| `image.repository`                | Image repository to pull from.                                                                                     | None = **This value is required.** |
| `image.pullPolicy`                |                                                                                                                    | `Always`                           |
| `image.tag`                       | Image tag.                                                                                                         | None = **This value is required.** |
| `imagePullSecrets`                | A list of pull secrets to apply to the `Deployment`.                                                               | `[]`                               |
| `ingress.enabled`                 | Whether or not to enable the `Ingress`.                                                                            | `false`                            |
| `ingress.className`               | `Ingress` class name.                                                                                              | `''`                               |
| `ingress.annotations`             |                                                                                                                    | `{}`                               |
| `ingress.hosts`                   | Host configuration for `Ingress`.                                                                                  | See `values.yaml`                  |
| `ingress.tls`                     | TLS configuration for `Ingress`.                                                                                   | `[]`                               |
| `nodeSelector`                    |                                                                                                                    | `{}`                               |
| `podAnnotations`                  | Annotations to apply directly to the `Pod` spawned by the `Deployment`.                                            | `{}`                               |
| `podLabels`                       | LAbels to apply directly to the `Pod` spawned by the `Deployment`.                                                 | `{}`                               |
| `podSecurityContext`              | Security context for the `Pod`.                                                                                    | `{}`                               |
| `resources.limits.cpu`            |                                                                                                                    | `500m`                             |
| `resources.limits.memory`         |                                                                                                                    | `512M`                             |
| `resources.requests.cpu`          |                                                                                                                    | `250m`                             |
| `resources.requests.memory`       |                                                                                                                    | `128M`                             |
| `securityContext`                 | Security context for the main process container.                                                                   | `{}`                               |
| `service.type`                    |                                                                                                                    | `ClusterIP`                        |
| `service.port`                    |                                                                                                                    | `80`                               |
| `serviceAccount.create`           |                                                                                                                    | `true`                             |
| `serviceAccount.annotations`      |                                                                                                                    | `{}`                               |
| `serviceAccount.name`             |                                                                                                                    | `''`                               |
| `tolerations`                     |                                                                                                                    | `[]`                               |
| `volumes`                         | A list of volumes to attach to the Deployment.                                                                     | `[]`                               |
| `volumeMounts`                    | A list of volume mounts to attach to the Deployment.                                                               | `[]`                               |
