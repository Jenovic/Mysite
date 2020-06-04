import * as React from 'react';
import Module from '../models/Module';
import Icon from './Icon';
import Slide from '../models/Slide';

interface Props {
  module: Module;
  handleSelect: (slide: Slide, slideIndex: number) => void;
  selectedIndex?: number;
}

export default class ModuleContents extends React.Component<Props> {
  render() {
    return (
      <aside className="menu module-contents">
        <ul className="menu-list">
          <p className="menu-label">{this.props.module.title}</p>
          {this.props.module.slides.map((slide, index) => {
            return (
              <li key={slide.uuid}>
                <a
                  className={
                    index === this.props.selectedIndex
                      ? 'has-text-weight-bold'
                      : ''
                  }
                  onClick={() => {
                    this.props.handleSelect(slide, index);
                  }}
                >
                  <div className="media">
                    <div className="media-left">
                      <Icon
                        iconName="circle fa-xs"
                        className={`${
                          index <= this.props.selectedIndex
                            ? 'has-text-primary'
                            : 'has-text-grey'
                        } is-small`}
                      />
                    </div>
                    <div className="media-content">{slide.title}</div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }
}
