---
layout: post
title:  "First Order Differential Equations"
date:   2025-10-31
thumbnail: thumbnail.png
dependencies:
    - p5
---

<div id="sketch-holder">
    <script type="text/javascript" src="sketch.js"></script>
</div>

A first-order differential equation is an equation that relates a function with its first derivative.
A simple example is `dy/dx = f(x,y)`.
This equation gives you the slope of the tangent to the solution curve at any point (x,y).

A good way to visualize a first-order differential equation is to draw a slope field, where at each point (x,y) you draw a small line segment with the slope given by the equation.

In this example, we will visualize the slope field for the equation `dy/dx = x/y`.
