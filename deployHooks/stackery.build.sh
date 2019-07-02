
#!/bin/sh

mkdir -p .aws-sam/build/src/

if [ -f .stackery/.stackery.template.yaml ]; then
    cp .stackery/.stackery.template.yaml .aws-sam/build/template.yaml
else
    cp .stackery/template.yaml .aws-sam/build/template.yaml
fi

  ( cd src/Function && GOPATH=$PWD && make )
  cp -r src/Function .aws-sam/build/src/Function
  