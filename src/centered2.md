---
title: Centered
description: How much centered semantic elements
date: 2023-10-07
layout: base
tags: primary
navTexte: Centered 2
---
{% assign items = centered | sort: 'section' | reverse %}
{% for item in items %}
- {{ item.name }}: {{ item.section }}%
{% endfor %}