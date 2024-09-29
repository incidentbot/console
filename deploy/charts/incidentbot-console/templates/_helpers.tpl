{{/*
Expand the name of the chart.
*/}}
{{- define "incidentbot-console.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "incidentbot-console.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "incidentbot-console.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "incidentbot-console.labels" -}}
helm.sh/chart: {{ include "incidentbot-console.chart" . }}
{{ include "incidentbot-console.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "incidentbot-console.selectorLabels" -}}
app.kubernetes.io/name: {{ include "incidentbot-console.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "incidentbot-console.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "incidentbot-console.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Environment variables formatter
*/}}
{{- define "incidentbot-console.envVarsFormatter" -}}
{{- range $key, $value := . }}
- name: {{ printf "%s" $key | upper | quote }}
  value: {{ $value | quote }}
{{- end -}}
{{- end -}}

{{/*
Rendered environment variables
*/}}
{{- define "incidentbot-console.envVars.rendered" -}}
{{- range $ctx := . }}
{{- if .envVars }}
{{- include "incidentbot-console.envVarsFormatter" .envVars }}
{{- end }}
{{- end }}
{{- end }}
