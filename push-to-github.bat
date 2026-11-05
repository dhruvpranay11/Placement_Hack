@echo off
set GIT_EXE="C:\Users\Dhruv Pranay\AppData\Local\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe"

echo ========================================================
echo PLACEREADY AI — GITHUB UPLOADER
echo ========================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo Error: No URL entered.
    pause
    exit /b
)

%GIT_EXE% remote remove origin 2>nul
%GIT_EXE% remote add origin %REPO_URL%
%GIT_EXE% branch -M main
echo.
echo Pushing to GitHub...
%GIT_EXE% push -u origin main

echo.
echo ========================================================
echo Push attempt finished!
echo ========================================================
pause
