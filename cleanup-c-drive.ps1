# C盘垃圾清理脚本
# 安全清理临时文件、缓存和日志

Write-Host "开始清理C盘垃圾文件..." -ForegroundColor Green
Write-Host ""

$totalCleaned = 0

# 1. 清理用户临时文件
Write-Host "清理用户临时文件..." -ForegroundColor Yellow
try {
    $tempFiles = Get-ChildItem -Path $env:TEMP -File -Recurse -ErrorAction SilentlyContinue
    $tempSize = ($tempFiles | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
    $totalCleaned += $tempSize
    Write-Host "  已清理: $([math]::Round($tempSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（可能正在使用）" -ForegroundColor Yellow
}

# 2. 清理本地临时文件
Write-Host "清理本地临时文件..." -ForegroundColor Yellow
try {
    $localTempFiles = Get-ChildItem -Path "$env:LOCALAPPDATA\Temp" -File -Recurse -ErrorAction SilentlyContinue
    $localTempSize = ($localTempFiles | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:LOCALAPPDATA\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
    $totalCleaned += $localTempSize
    Write-Host "  已清理: $([math]::Round($localTempSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（可能正在使用）" -ForegroundColor Yellow
}

# 3. 清理Windows更新缓存（需要管理员权限）
Write-Host "清理Windows更新缓存..." -ForegroundColor Yellow
try {
    Stop-Service -Name wuauserv -Force -ErrorAction SilentlyContinue
    $updateCache = Get-ChildItem -Path "$env:SystemRoot\SoftwareDistribution\Download" -File -Recurse -ErrorAction SilentlyContinue
    $updateSize = ($updateCache | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:SystemRoot\SoftwareDistribution\Download\*" -Recurse -Force -ErrorAction SilentlyContinue
    Start-Service -Name wuauserv -ErrorAction SilentlyContinue
    $totalCleaned += $updateSize
    Write-Host "  已清理: $([math]::Round($updateSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（需要管理员权限）" -ForegroundColor Yellow
    Start-Service -Name wuauserv -ErrorAction SilentlyContinue
}

# 4. 清理缩略图缓存
Write-Host "清理缩略图缓存..." -ForegroundColor Yellow
try {
    $thumbnails = Get-ChildItem -Path "$env:LOCALAPPDATA\Microsoft\Windows\Explorer" -Filter "thumbcache_*.db" -ErrorAction SilentlyContinue
    $thumbSize = ($thumbnails | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:LOCALAPPDATA\Microsoft\Windows\Explorer\thumbcache_*.db" -Force -ErrorAction SilentlyContinue
    $totalCleaned += $thumbSize
    Write-Host "  已清理: $([math]::Round($thumbSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（可能正在使用）" -ForegroundColor Yellow
}

# 5. 清理WinSxS临时文件
Write-Host "清理WinSxS临时文件..." -ForegroundColor Yellow
try {
    $winSxSTemp = Get-ChildItem -Path "$env:SystemRoot\WinSxS\Temp" -File -Recurse -ErrorAction SilentlyContinue
    $winSxSSize = ($winSxSTemp | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:SystemRoot\WinSxS\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
    $totalCleaned += $winSxSSize
    Write-Host "  已清理: $([math]::Round($winSxSSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（需要管理员权限）" -ForegroundColor Yellow
}

# 6. 清理DISM日志
Write-Host "清理DISM日志..." -ForegroundColor Yellow
try {
    $dismLogs = Get-ChildItem -Path "$env:SystemRoot\Logs\DISM" -File -Recurse -ErrorAction SilentlyContinue
    $dismSize = ($dismLogs | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:SystemRoot\Logs\DISM\*" -Recurse -Force -ErrorAction SilentlyContinue
    $totalCleaned += $dismSize
    Write-Host "  已清理: $([math]::Round($dismSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（需要管理员权限）" -ForegroundColor Yellow
}

# 7. 清理CBS日志
Write-Host "清理CBS日志..." -ForegroundColor Yellow
try {
    $cbsLogs = Get-ChildItem -Path "$env:SystemRoot\Logs\CBS" -File -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) }
    $cbsSize = ($cbsLogs | Measure-Object -Property Length -Sum).Sum
    $cbsLogs | Remove-Item -Force -ErrorAction SilentlyContinue
    $totalCleaned += $cbsSize
    Write-Host "  已清理: $([math]::Round($cbsSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（需要管理员权限）" -ForegroundColor Yellow
}

# 8. 清理Edge浏览器缓存
Write-Host "清理Edge浏览器缓存..." -ForegroundColor Yellow
try {
    $edgeCache = Get-ChildItem -Path "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache" -File -Recurse -ErrorAction SilentlyContinue
    $edgeSize = ($edgeCache | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache\*" -Recurse -Force -ErrorAction SilentlyContinue
    $totalCleaned += $edgeSize
    Write-Host "  已清理: $([math]::Round($edgeSize/1GB, 2)) GB" -ForegroundColor Green
} catch {
    Write-Host "  跳过（浏览器可能正在运行）" -ForegroundColor Yellow
}

# 9. 清理回收站
Write-Host "清理回收站..." -ForegroundColor Yellow
try {
    Clear-RecycleBin -Force -ErrorAction SilentlyContinue
    Write-Host "  回收站已清空" -ForegroundColor Green
} catch {
    Write-Host "  跳过" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "清理完成！" -ForegroundColor Green
Write-Host "总共清理了约: $([math]::Round($totalCleaned/1GB, 2)) GB" -ForegroundColor Cyan

# 显示清理后的磁盘空间
$drive = Get-PSDrive C
Write-Host ""
Write-Host "当前C盘状态:" -ForegroundColor Cyan
Write-Host "  已使用: $([math]::Round($drive.Used/1GB, 2)) GB" -ForegroundColor White
Write-Host "  可用空间: $([math]::Round($drive.Free/1GB, 2)) GB" -ForegroundColor White
