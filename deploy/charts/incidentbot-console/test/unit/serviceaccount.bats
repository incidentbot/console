#!/usr/bin/env bats

load _helpers

#--------------------------------------------------------------------
# ServiceAccount

@test "serviceaccount: creates" {
    cd $(chart_dir)
    local actual=$(helm template \
        --show-only templates/serviceaccount.yaml \
        --set 'image.repository=example' \
        --set 'image.tag=example' \
        . | tee /dev/stderr |
        yq 'length > 0' | tee /dev/stderr)
    [ "${actual}" = "true" ]
}
