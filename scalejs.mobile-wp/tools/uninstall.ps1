param($installPath, $toolsPath, $package, $project)

$project |
	Remove-Paths 'scalejs.mobile-wp' |
	Remove-ScalejsExtension 'scalejs.mobile-wp' |
	Out-Null
