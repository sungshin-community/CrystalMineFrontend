 #!/bin/zsh


 # Install dependencies using Homebrew. This is MUST! Do not delete.
 brew install node yarn cocoapods fastlane

 # Install yarn and pods dependencies.
 # If you're using Flutter or Swift 
 # just install pods by "pod install" command 
 ls && cd .. && yarn && pod install