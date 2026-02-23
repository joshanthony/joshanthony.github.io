---
layout: default
title: Home
description: Notes and insights from a software engineer.
---

<section>
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        {% assign display_date = post.last_modified_at | default: post.date %}
        <p class="post-meta"><time datetime="{{ display_date | date_to_xmlschema }}">{{ display_date | date: "%b %-d, %Y" }}</time></p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% if post.excerpt %}<p class="post-summary">{{ post.excerpt | strip_html }}</p>{% endif %}
        <a class="read-more" href="{{ post.url | relative_url }}">Read &rarr;</a>
      </li>
    {% else %}
      <li><p>No posts yet.</p></li>
    {% endfor %}
  </ul>
</section>
