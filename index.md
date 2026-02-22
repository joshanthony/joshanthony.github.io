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
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
          {% if post.last_modified_at %}
            · Updated {{ post.last_modified_at | date: "%B %-d, %Y" }}
          {% endif %}
        </p>
        {% if post.excerpt %}
          <p>{{ post.excerpt | strip_html }}</p>
        {% endif %}
      </li>
    {% else %}
      <li><p>No posts yet.</p></li>
    {% endfor %}
  </ul>
</section>
