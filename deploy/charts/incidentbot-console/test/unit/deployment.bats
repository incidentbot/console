#!/usr/bin/env bats

load _helpers

#--------------------------------------------------------------------
# Deployment

@test "deployment: creates" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq 'length > 0' | tee /dev/stderr)
    [ "${actual}" = "true" ]
}

@test "deployment: annotations" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'deploymentAnnotations.someVar=someValue' \
        . | tee /dev/stderr |
        yq -r '.metadata.annotations["someVar"]' | tee /dev/stderr)
    [ "${actual}" = "someValue" ]
}

@test "deployment: extraContainers" {
    cd $(chart_dir)
    local object=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'extraContainers[0].name=test' \
        --set 'extraContainers[0].image=test' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[1]' | tee /dev/stderr)

    local actual=$(echo "$object" | yq '.name' | tee /dev/stderr)
    [ "${actual}" = "test" ]

    local actual=$(echo "$object" | yq '.image' | tee /dev/stderr)
    [ "${actual}" = "test" ]
}

@test "deployment: nodeSelector" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'nodeSelector.foo=bar' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.nodeSelector.foo' | tee /dev/stderr)
    [ "${actual}" = "bar" ]
}

@test "deployment: podAnnotations" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'podAnnotations.someVar=someValue' \
        . | tee /dev/stderr |
        yq -r '.spec.template.metadata.annotations.someVar' | tee /dev/stderr)
    [ "${actual}" = "someValue" ]
}

@test "deployment: podSecurityContext" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'podSecurityContext.runAsUser=1000' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.securityContext.runAsUser' | tee /dev/stderr)
    [ "${actual}" = "1000" ]
}

@test "deployment: securityContext" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'securityContext.runAsUser=1000' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].securityContext.runAsUser' | tee /dev/stderr)
    [ "${actual}" = "1000" ]
}

@test "deployment: tolerations" {
    cd $(chart_dir)
    local object=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'tolerations[0].key=example' \
        --set 'tolerations[0].operator=Exists' \
        --set 'tolerations[0].effect=NoSchedule' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.tolerations[0]' | tee /dev/stderr)

    local actual=$(echo "$object" | yq '.key' | tee /dev/stderr)
    [ "${actual}" = "example" ]

    local actual=$(echo "$object" | yq '.operator' | tee /dev/stderr)
    [ "${actual}" = "Exists" ]

    local actual=$(echo "$object" | yq '.effect' | tee /dev/stderr)
    [ "${actual}" = "NoSchedule" ]
}

#--------------------------------------------------------------------
# Health Checks

@test "deployment: health checks" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].livenessProbe.initialDelaySeconds' | tee /dev/stderr)
    [ "${actual}" = "10" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].livenessProbe.periodSeconds' | tee /dev/stderr)
    [ "${actual}" = "30" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].livenessProbe.timeoutSeconds' | tee /dev/stderr)
    [ "${actual}" = "1" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].livenessProbe.httpGet.path' | tee /dev/stderr)
    [ "${actual}" = "/" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].livenessProbe.httpGet.port' | tee /dev/stderr)
    [ "${actual}" = "80" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].readinessProbe.initialDelaySeconds' | tee /dev/stderr)
    [ "${actual}" = "10" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].readinessProbe.periodSeconds' | tee /dev/stderr)
    [ "${actual}" = "30" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].readinessProbe.timeoutSeconds' | tee /dev/stderr)
    [ "${actual}" = "1" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].readinessProbe.httpGet.path' | tee /dev/stderr)
    [ "${actual}" = "/" ]

    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].readinessProbe.httpGet.port' | tee /dev/stderr)
    [ "${actual}" = "80" ]
}

#--------------------------------------------------------------------
# Images

@test "deployment: image" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].image' | tee /dev/stderr)
    [ "${actual}" = "example:example" ]
}

#--------------------------------------------------------------------
# Variables

@test "deployment: envVars render" {
    cd $(chart_dir)
    local object=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'envVars.MYVAR=myVarValue' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].env[0]' | tee /dev/stderr)

    local actual=$(echo "$object" | yq '.name' | tee /dev/stderr)
    [ "${actual}" = "MYVAR" ]

    local actual=$(echo "$object" | yq '.value' | tee /dev/stderr)
    [ "${actual}" = "myVarValue" ]
}

@test "deployment: envFromSecret works on main container" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/deployment.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        --set 'envFromSecret.enabled=true' \
        --set 'envFromSecret.secretName=someSecret' \
        . | tee /dev/stderr |
        yq -r '.spec.template.spec.containers[0].envFrom[0].secretRef' | tee /dev/stderr)
    [ "${actual}" = "name: someSecret" ]
}
