# Sanity Studio lucasamos.dev

yarn studio:sanity datasets export development dataset.tar.gz --overwrite  --no-drafts

yarn studio:sanity documents validate --dataset development --file dataset.tar.gz --yes --level error
