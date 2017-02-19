C:\ProgramData\chocolatey\bin\GitVersion /updateassemblyinfo

$Output = C:\ProgramData\chocolatey\bin\GitVersion /nofetch | Out-String
$version = $output | ConvertFrom-Json

Write-Output ("##vso[task.setvariable variable=build.buildnumber;]" + $version.MajorMinorPatch)
Write-Output ("##vso[build.updatebuildnumber]" + $version.MajorMinorPatch)
