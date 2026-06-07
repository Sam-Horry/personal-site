---
title: "Hijacking my university's compute to run AI models"
date: 2026-06-07
---
## Introduction

Since I have been experimenting with hosting and running LLMs on my own hardware at home, I have been fascinated with their capabilities and how I can get the most out of their limited size.

The size of model that I can run on my gaming pc at home will depend on whether or not I can fit it in the VRAM of my graphics card, and maybe offload some of the model to my system RAM, if I'm alright with losing a bit of speed in exchange for a more powerful model. Whilst this has been a fun challenge, I realised that if I really wanted to get the most out of my setup, I would have to upgrade.

One thing I did was purchase an old AMD server-grade accelerator, the Instinct MI50 32GB. After plugging it in to my gaming pc and getting it set up, it worked for a while, but then I started encountering stability issues with it, which ultimately led to me returning it. I guess the lesson here is that maybe I shouldn't try to use server-grade components on a consumer-grade platform. They didn't seem to like working with each other!

However, an alternative solution presented itself. A little while ago, after asking really nicely, I was given access to HPC computing servers by my university, which are usually utilised by the robotics and machine-learning students. This platform has access to some much more powerful hardware, including Nvidia A100 GPUs with up to 80GB of VRAM, significantly more than what I previously had access to at home.

The HPC platform works by using the SLURM job manager system, which allows users to submit jobs to specific nodes. This is great because if a job is currently running on a node you need, your job will sit in a queue, and once the other job has finished, yours will be started and run until it is completed. There are, however, a couple roadblocks that I had to get around in order to use this as a true replacement for running LLMs on my own hardware.

## The Problems

1. The HPC servers are isolated from the internet, so they need an enterprise VPN connection in order to access them.

2. Documentation for the platform did not give any instruction or guidance on how to use inference applications such as vLLM or llama.cpp, which is what I needed to use.

## The Solutions

Firstly, I needed to figure out how to actually run the models on the HPC compute nodes. After writing up some batch scripts, I was able to use SLURM to submit a vLLM job to start up the server, download a model from [huggingface](https://huggingface.co), and load the model into the VRAM of whatever GPU was on the node I submitted the job to.

In order to actually connect to the endpoint that vLLM was advertising, I couldn't just connect directly to the url from the chat UIs I was using ([OpenCode](https://github.com/anomalyco/opencode), and [Open-WebUI](https://github.com/open-webui/open-webui)), since access to the server was behind a VPN connection.

After setting up various tunnels and connections to and from the HPC servers, I was able to connect to it from any chat UI I wanted and talk to the models as if I was using ChatGPT or Claude. This was by far the hardest to set up, since my knowledge of networking was lacking at the time, but it was a fun challenge, especially since the HPC servers are isolated from the rest of the internet.

## The Downsides

Whilst this setup allows me to run much larger LLMs than what I was previously capable of at home, there are some major drawbacks that make this solution not as great as it could be.

First of all, it is not as convenient as running models on my own hardware. There are quite a few hoops I need to jump through in order to start using the models, namely connecting to the VPN and waiting for the vLLM server to actually start up. On average, it takes around 5+ minutes for the model to be ready, since the model weights needed to be loaded onto the GPU and the vLLM server started.

Secondly, since this is a platform that is available to multiple students and researchers, the jobs that I submit do not take priority, so any students running machine-learning workloads will take priority over my inference, which I have mostly just been playing with as a hobby. This means that the job I submitted can be cancelled at any time and without warning if I am using a compute node that is required by someone who needs to get any actual work done, which can be quite frequent.

## Conclusion

Other than the downsides, it was a great challenge to get this system working in a way that suited my use-cases, and massively improved my understanding of HPC environments and the SLURM management system. The models I run may not be as powerful as cloud-hosted offerings, and it's not as convenient, but I have really enjoyed getting a better understanding on how AI inference actually works.
