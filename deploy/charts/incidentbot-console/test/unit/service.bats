#!/usr/bin/env bats

load _helpers

#--------------------------------------------------------------------
# Service

@test "service: creates" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/service.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq 'length > 0' | tee /dev/stderr)
    [ "${actual}" = "true" ]
}
