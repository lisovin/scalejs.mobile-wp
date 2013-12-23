param($installPath, $toolsPath, $package, $project)

$project |
	Add-Paths "{
		'scalejs.mobile-wp' : 'Scripts/scalejs.mobile-wp-$($package.Version)'
	}" |
	Add-ScalejsExtension 'scalejs.mobile-wp' |
	Out-Null