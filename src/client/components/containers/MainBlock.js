/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './mainBlock.css';

const valueItem = [
  {
    name: 'Дизайн сайта UI и UX',
    value: `Рекламные компании говорят, что реклама необходима и важна. 
    Он информирует людей нових продуктах. Рекламные щиты на улице делают нашу среду яркой`,
    hashtag: '#Landing-page #Логотип #Промо-сайт'
  },
  {
    name: 'Дизайн сайта UI и UX',
    value: `Рекламные компании говорят, что реклама необходима и важна. 
    Он информирует людей нових продуктах. Рекламные щиты на улице делают нашу среду яркой`,
    hashtag: '#Landing-page #Логотип #Промо-сайт'
  },
  {
    name: 'Дизайн сайта UI и UX',
    value: `Рекламные компании говорят, что реклама необходима и важна. 
    Он информирует людей нових продуктах. Рекламные щиты на улице делают нашу среду яркой`,
    hashtag: '#Landing-page #Логотип #Промо-сайт'
  },
  {
    name: 'Дизайн сайта UI и UX',
    value: `Рекламные компании говорят, что реклама необходима и важна. 
    Он информирует людей нових продуктах. Рекламные щиты на улице делают нашу среду яркой`,
    hashtag: '#Landing-page #Логотип #Промо-сайт'
  }
];

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="main__block">
        <div className="filter__block">
          <span>Фильтры</span>
        </div>
        <div className="result__block">
          <span>Найдено (192 услуги)</span>
          <div className="items">
            {valueItem.map((item, index) => (
              <div
                className="item"
                key={ index }
              >
                <span>{item.name}</span>
                <p>{item.value}</p>
                <spam>{item.hashtag}</spam>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(MainBlock);
