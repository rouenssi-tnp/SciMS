/** @flow */
import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import MainContent from './MainContent'

import type { Category } from '../services/categories'
import type { Article } from '../services/articles'

const icons = {
  'Mathematics': 'book',
  'Statistics': 'line-chart',
  'Arithmetics': 'plus',
  'Chemistry': 'flask',
  'Physics': 'space-shuttle',
}

function TimeAgo({value, ...props}: {value: string}) {
  const dt = moment(value)

  return <span {...props}>{dt.fromNow()}</span>
}

function Card(props: {category: Category}) {
  return (
    <Link to={`/category/${props.category.id}/${props.category.name}`} className="article-category-card">
      <span className="name">
        <i className={`fa fa-${icons[props.category.name]}`}/>
        <span>{props.category.name}</span>
      </span>

      <span className="stat">
        {props.category.article_count} articles
      </span>
    </Link>
  )
}

function ArticleSpan({article}: {article: Article}) {
  return (
    <span className="category-article-list-element">
      <span className="name">{article.title}</span>
      <br/>
      <span className="details">
        <span className="author">by <a href={`mailto:${article.user.email}`}>{article.user.first_name} {article.user.last_name}</a></span>
        <TimeAgo value={article.publication_date} className="publication_date"/>
        <span className="popularity"><i className="fa fa-level-up fa-fw"/> 8</span>
        <span className="comments"><i className="fa fa-commenting-o fa-fw"/> 101</span>
      </span>
    </span>
  )
}

export class ArticleCategory extends React.Component {
  props: {
    category: ?Category,
    categories: Array<Category>,
    articles: Array<Article>,

    loadCategory: () => void,
  }

  componentDidMount() {
    this.props.loadCategory()
  }

  render() {
    if (!this.props.category) {
      return (
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"/>
      )
    }

    return (
      <MainContent side="center">
        <div className="bloc">
          <h1>
            <i className={`fa fa-${icons[this.props.category.name]}`}/>
            {' '}{this.props.category.name}
          </h1>

          {this.renderSubcategories(this.props.category)}
          {this.renderArticles()}
        </div>
      </MainContent>
    )
  }

  renderSubcategories(category: Category) {
    const directChildren = this.props.categories.filter(x => x.parent_categories === category.id)

    if (directChildren.length <= 0) {
      return null
    }

    return (
      <div>
        <h3 style={{margin: 0}}>Sub-categories</h3>

        <section className="article-category-cards" style={{marginBottom: '1em'}}>
          {directChildren.map((x, i) => <Card key={i} category={x}/>)}
        </section>
      </div>
    )
  }

  renderArticles() {
    return (
      <div>
        <h3>Trending Articles</h3>

        <ol className="category-article-list">
          {this.props.articles.map((x, i) => <li key={i}><ArticleSpan article={x}/></li>)}
        </ol>
      </div>
    )
  }
}