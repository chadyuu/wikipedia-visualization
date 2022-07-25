## Visualize the article network on Wikipedia

This document aims to visualize the link network on [Wikipedia](https://en.wikipedia.org/wiki/Main_Page) for CS 416: Data Visualization at the University of Illinois Urbana-Champaign.

Since a hyperlink corresponds a citation in academic papers, we can assume an article with more inbound links is more significant in the Wikipedia ecosystem.
This idea is similar to the Google search engine algorithm, which partly evaluates each webpage based on the number of inbound links.


## Data source

`links.tsv` in [wikispeedia_paths-and-graph.tar.gz](https://snap.stanford.edu/data/wikispeedia/wikispeedia_paths-and-graph.tar.gz), found at [Wikispeedia navigation paths in Stanford Large Network Dataset Collection](https://snap.stanford.edu/data/wikispeedia.html)


### Data preprocessing

Preprocessed the data by sqlite3.

1. Import `links.tsv`.

```sql
CREATE TABLE links (source text, target text);
.open wikipedia.db
.mode tabs
.import data/links.tsv links
```

2. Create the "node" table.

```sql
CREATE TABLE node (id INTEGER PRIMARY KEY AUTOINCREMENT, node text UNIQUE);
```

```sql
INSERT INTO node (node)
SELECT distinct(node) FROM
(
  SELECT DISTINCT(source) as node FROM links
  UNION
  SELECT DISTINCT(target) as node FROM links
);
```

3. Create the "edge" table.

```sql
CREATE TABLE edge (source INTEGER, target INTEGER);
```

```sql
INSERT INTO edge (source, target)
SELECT
  source_node.id,
  target_node.id
FROM links
JOIN node source_node on links.source = source_node.node
JOIN node target_node on links.target = target_node.node;
```

4. Create the "cnt" table.

```sql
CREATE TABLE cnt AS
SELECT node.id, node.node, IFNULL(cnt, 0) as cnt
FROM node
LEFT JOIN
(
  SELECT target, COUNT(*) as cnt
  FROM edge
  GROUP BY target
)a
on a.target = node.id
ORDER BY cnt DESC;
```

THe `edge.csv` and `cnt.csv` files, exported from the corresponding tables, are used in the visualization part.
