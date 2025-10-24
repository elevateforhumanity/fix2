FROM gitpod/workspace-full

USER gitpod
RUN sudo apt-get update && \
    sudo apt-get install -y jq moreutils python3-pip && \
    pip install git-filter-repo yq==3.2.2 && \
    sudo rm -rf /var/lib/apt/lists/*
