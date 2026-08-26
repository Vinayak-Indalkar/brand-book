# Pure Socket-based High Performance Static Server (Host-Agnostic, Tunnel-Compatible)
$port = 3000
$root = $PSScriptRoot

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
$listener.Start()

Write-Host "Brand Book Server is live on port $port (Any Host / Localhost / Tunnel)"

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)

        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($requestLine)) {
            $client.Close()
            continue
        }

        # Read remaining headers
        while ($true) {
            $line = $reader.ReadLine()
            if ([string]::IsNullOrWhiteSpace($line)) { break }
        }

        $parts = $requestLine.Split(' ')
        $method = $parts[0]
        $rawUrl = if ($parts.Length -gt 1) { $parts[1] } else { "/" }

        $urlPath = $rawUrl.Split('?')[0]
        if ($urlPath -eq "/" -or [string]::IsNullOrEmpty($urlPath)) {
            $urlPath = "/index.html"
        }

        $decodedPath = [System.Uri]::UnescapeDataString($urlPath)
        $localFile = [System.IO.Path]::Combine($root, $decodedPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar))

        if ([System.IO.File]::Exists($localFile)) {
            $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            $headerText = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headerText)

            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($bytes, 0, $bytes.Length)
        } else {
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
            $headerText = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($notFound.Length)`r`nConnection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headerText)

            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($notFound, 0, $notFound.Length)
        }

        $stream.Flush()
        $client.Close()
    } catch {
        # Continue listening on next connection
    }
}
