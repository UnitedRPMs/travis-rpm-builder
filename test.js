//
// PACKAGE=$(grep packages_buildrequires_git .travis.yml | cut -d '/' -f2)
// DISTRO=$(grep mock_config .travis.yml | cut -d ' ' -f4)
// DATE=$(date +"%Y-%m-%d--%H-%m-%S")
//
// git add . && git commit -m "Add $PACKAGE"
//
// git tag -a "$PACKAGE-${DISTRO^^}-$DATE" -m "$PACKAGE-${DISTRO^^}"
// git push --tags origin master
var fs = require('fs');
const spawn = require('child_process').spawnSync;


const datestr = new Date().toISOString().replace(/:/g, '-');
// console.log(datestr);
var BuildConfig = fs.readFileSync('.travis.yml', 'utf8');
// console.log(BuildConfig);
const package = BuildConfig.split('\n')[2].split('/')[1];
// console.log(package);
var distro = BuildConfig.split('\n')[1].split('-')[1].replace('rawhide','27');
// console.log(distro);

const gitAdd = spawn( 'git', [ 'add', '.' ]);
if (~gitAdd.stderr) { console.log(gitAdd.stderr.toString());  }

const gitCommit = spawn('git', ['commit', '-m', package]);
if (~gitCommit.stderr) { console.log(gitCommit.stderr.toString());  }


const gitTag = spawn('git', ['tag', '-a', package + distro +'-'+ datestr, '-m', package + distro]);
if (~gitTag.stderr) { console.log(gitTag.stderr.toString());  }


const gitPush = spawn('git', ['push', '--tags', 'origin', 'master']);
if (~gitPush.stderr) { console.log(gitPush.stderr.toString());  }
