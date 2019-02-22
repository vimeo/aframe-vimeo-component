<h1 align="center">Vimeo A-Frame component</h1>

<p align="center"><b>An A-Frame component for streaming video from Vimeo to WebGL/VR/AR apps</b></p>

<p align="center">
  <a href="https://app.codeship.com/projects/325924"><img src="https://app.codeship.com/projects/dc6de560-07c0-0137-30da-5e4580378d6f/status?branch=master" alt="Build Status"></a>
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Code Style">
    <img src="https://img.shields.io/npm/l/aframe.svg?style=flat-square" alt="License"></a>
</p>

<div align="center">
  <a href="https://github.com/vimeo/vimeo-threejs-player/wiki/Getting-Started-%F0%9F%9A%80">Getting started</a>
  &mdash;
  <a href="#stay-in-touch">Stay in touch</a>
</div>

## Examples

<a href="#">
  <img alt="Basic" target="_blank" src="https://i.imgur.com/4EZryzy.gif" height="190" width="32%">
</a>
<a href="#">
  <img alt="Shapes" target="_blank" src="https://i.imgur.com/XZi8pfj.gif" height="190" width="32%">
</a>
<a href="#">
  <img alt="360 WebVR" target="_blank" src="https://i.imgur.com/2xo8mrq.gif" height="190" width="32%">
</a>


## Features
📼 **Streaming video made simple**: The component lets you stream video hosted on Vimeo directly to your A-Frame app

🏋🏿‍ **Let us do the heavy lifting**: stream multiple resolutions including adaptive video on supported platforms for best performance and video quality

📱 **Works everywhere**: works on phones, tablets, laptops, computers, VR headsets and even underwater

## Usage
To start playing and streaming video now, remix the Glitch example:

[Glitch badge]

The first step is to generate your own Vimeo API token. [Generate the token](https://vimeo-authy.herokuapp.com/auth/vimeo/webgl), and then copy it and paste it into the *.env* in Glitch.

Almost done, go to the basic example under `examples/basic.html`
 and change the video id in line in to your Vimeo video id. It should look like
 ```html
  <a-entity vimeo="id: vimeo_video_id">
 ```
Try our other examples or head to our getting started guide to learn more

> Streaming Vimeo videos requires video file access via the Vimeo API. Accessing video files is limited to [Vimeo Pro and Business](https://vimeo.com/upgrade) customers.

## Questions
For questions and support, [open a Github issue](https://github.com/vimeo/aframe-vimeo-component/issues/new).

## Stay in Touch
[Join our newsletter](https://vimeo.us6.list-manage.com/subscribe?u=a3cca16f9d09cecb87db4be05&id=28000dad3e) for more updates, or visit the [Creator Labs website](https://labs.vimeo.com) to learn more.

## Contributing
Get involved! Check out the [Setting up the development environment guide](https://github.com/vimeo/vimeo-threejs-player/wiki/Setting-up-the-development-environment-%F0%9F%91%B7%F0%9F%8F%BD%E2%80%8D) for how to get started.

## License
This software is free software and is distributed under an [MIT License](LICENSE).