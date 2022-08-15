node {

    stage('build') {
        sh 'git clone https://github.com/Generic-Application-Bootstrapper/Gui.git .'
        sh 'npm run  install'
        sh 'npm run  build'
    }

    stage('test') {
        sh 'git clone https://github.com/Generic-Application-Bootstrapper/Gui.git .'
        sh 'npm run  install'
        sh 'npm run test'
    }

    stage('deploy') {
        sh 'git clone https://github.com/Generic-Application-Bootstrapper/Gui.git .'
        sh 'npm run  install'
        sh 'npm run start'
    }
}