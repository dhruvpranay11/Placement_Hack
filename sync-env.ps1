# Syncs the root .env to server/.env and client/.env automatically
$rootEnv = Get-Content -Path "$PSScriptRoot\.env" -Raw

# Parse lines
$envMap = @{}
foreach ($line in ($rootEnv -split "`r?`n")) {
    $line = $line.Trim()
    if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
        $idx = $line.IndexOf("=")
        $key = $line.Substring(0, $idx).Trim()
        $val = $line.Substring($idx + 1).Trim()
        $envMap[$key] = $val
    }
}

# 1. Write server/.env
$serverContent = @"
PORT=$($envMap['PORT'])
NODE_ENV=$($envMap['NODE_ENV'])
SUPABASE_URL=$($envMap['SUPABASE_URL'])
SUPABASE_ANON_KEY=$($envMap['SUPABASE_ANON_KEY'])
SUPABASE_SERVICE_ROLE_KEY=$($envMap['SUPABASE_SERVICE_ROLE_KEY'])
GEMINI_API_KEY=$($envMap['GEMINI_API_KEY'])
CORS_ORIGIN=$($envMap['CORS_ORIGIN'])
"@
Set-Content -Path "$PSScriptRoot\server\.env" -Value $serverContent -Encoding utf8

# 2. Write client/.env
$supabaseUrl = if ($envMap['VITE_SUPABASE_URL']) { $envMap['VITE_SUPABASE_URL'] } else { $envMap['SUPABASE_URL'] }
$supabaseAnon = if ($envMap['VITE_SUPABASE_ANON_KEY']) { $envMap['VITE_SUPABASE_ANON_KEY'] } else { $envMap['SUPABASE_ANON_KEY'] }

$clientContent = @"
VITE_SUPABASE_URL=$supabaseUrl
VITE_SUPABASE_ANON_KEY=$supabaseAnon
"@
Set-Content -Path "$PSScriptRoot\client\.env" -Value $clientContent -Encoding utf8

Write-Host "SUCCESS: Root .env synced to server\.env and client\.env!" -ForegroundColor Green

