node {

    stage('build') {
        sh 'rm -rf ./{*,.[a-zA-Z]*}'
        sh 'git clone https://github.com/Generic-Application-Bootstrapper/Gui.git .'
        sh 'npm install'
        sh 'npm run build'
    }

    stage('test') {
        sh 'npm install'
        sh 'npm run test'
    }

    stage('deploy') {
        sh 'npm  install'
        sh 'npm run start'
    }
}