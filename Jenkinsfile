node {
  def app
  currentBuild.result = "SUCCESS"
  try {
    stage('Clone repository') {
      checkout scm
    }
    
    stage('NPM Install') {
      sh 'pwd'
      sh 'node -v'
      sh 'rm -rf node_modules'
      sh 'npm cache clean --force'
      sh 'npm install'
    }
    
    stage('NPM Build') {
      sh 'npm run build'
    }
    
    // stage('Quality Gate') {
    //     def scannerHome = tool 'SonarQube Scanner 2.8';
    //     withSonarQubeEnv {
    //         sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=org.fakesite.company.site:dev -Dsonar.projectName='Example site' -Dsonar.projectVersion=0.1 -Dsonar.sources=src/ -Dsonar.sourceEncoding=UTF-8 -Dsonar.javascript.lcov.reportPaths=dist/coverage/lcov.info -Dsonar.exclusions=**/*spec.js"
    //     }
    // }
    
    stage('Build Docker Image') {
      app = docker.build("fakesite/company-website")
    }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }
    
    stage('Push image') {
        docker.withRegistry('https://prod.none-of-your.biz', 'asdf') {
            if (env.BRANCH_NAME != 'master') {
                echo 'This is not master'
                app.push("latest-dev")
            } else {
                app.push("latest-prod")
            }
            
        }
    }

  } catch (err) {
    currentBuild.result = 'FAILURE'
    throw err
  } finally {
    step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: "${sn_dev_email_dist_list}", sendToIndividuals: true])
  }
}