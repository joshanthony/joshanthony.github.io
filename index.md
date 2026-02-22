---
layout: default
title: Home
description: Notes and insights from a software engineer.
---

<section>
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p class="post-summary">
          {% assign display_date = post.last_modified_at | default: post.date %}
          <span class="post-meta"><time datetime="{{ display_date | date_to_xmlschema }}">{{ display_date | date: "%b %-d, %Y" }}</time></span>{% if post.excerpt %} — {{ post.excerpt | strip_html }}{% endif %}
        </p>
      </li>
    {% else %}
      <li><p>No posts yet.</p></li>
    {% endfor %}
  </ul>
</section>
