import React, { Component } from 'react';
import { Button } from '../design';

export function createEditableListItem(components, options) {
  const [
    Editor,
    Viewer
  ] = components;
  const {
    className,
    validator
  } = options;
  const fullClassName = `${className}-list-item`;
  class EditableListItem extends Component {
    constructor(props) {
      super(props);
      const { model } = props;
      this.state = {
        input: model.$temp ? {} : { ...model },
        error: null,
        stage: model.$temp ? 'editor' : 'viewer'
      };
    }

    changeInput(key, value) {
      const { input } = this.state;
      input[key] = value;
      this.setState({ input });
    }
  
    activeInput() {
      this.setState({ stage: 'editor' });
    }
  
    cancelInput() {
      const { model } = this.props;
      // todo - confirm unsaved
      if (model.$temp) {
        // only remove temp item
        this.raiseRemove();
      } else {
        this.setState({ stage: 'viewer' });
      }
    }

    raiseSelect() {
      if (this.props.onSelect) {
        this.props.onSelect();
      }
    }
  
    raiseRemove() {
      if (this.props.onRemove) {
        this.props.onRemove();
      }
    }
  
    raiseUpdate() {
      console.log('raiseUpdate')
      const { model } = this.props;
      const { input } = this.state;
      if (validator) {
        const error = validator(input);
        this.setState({ error });
        if (error) {
          console.error(error);
          return;
        }
      }
      this.setState({ stage: 'viewer' });
      if (this.props.onUpdate) {
        this.props.onUpdate(input);
      }
    }
  
    render() {
      const { stage } = this.state;
      const { model } = this.props;
      if (stage === 'editor') {
        return (
          <li className={fullClassName}>
            <Editor model={model}
              onCancel={() => this.cancelInput()}
              onUpdate={() => this.raiseUpdate()}
              onChange={(key, value) => this.changeInput(key, value)} />
          </li>
        );
      }
      return (
        <li className={fullClassName}>
          <Viewer model={model}
            onSelect={() => this.raiseSelect()}
            onActive={() => this.activeInput()}
            onRemove={() => this.raiseRemove()} />
        </li>
      );
    }
  }
  return EditableListItem;
}

export function createEditableList(components, options) {
  const [
    EditableListItem,
    EmptyView
  ] = components;
  const {
    className,
    reactKey = 'key',
    dataSource
  } = options;
  const fullClassName = `${className}-list`;
  class EditableList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        model: props.model || []
      };
      this.idgen = 1;
    }

    static getDerivedStateFromProps(props, state) {
      if (state.model !== props.model) {
        state.model = props.model;
      }
      return state;
    }

    createItem() {
      const { model } = this.state;
      model.unshift({ $temp: this.idgen });
      this.idgen += 1;
      this.setState({ model });
    }
  
    async selectItem(item) {
      await dataSource.select(item);
    }

    async removeItem(item) {
      if (!item.$temp) {
        await dataSource.delete(item);
      }
      const { model } = this.state;
      const i = model.indexOf(item);
      console.log('removeItem', i);
      if (i >= 0) {
        model.splice(i, 1);
        this.setState({ model });
      }
    }
  
    async updateItem(item, next) {
      console.log(item, next);
      const result = await dataSource.update(item, next);
      const { model } = this.state;
      const i = model.indexOf(item);
      console.log('updateItem', i);
      if (i >= 0) {
        model.splice(i, 1, result);
        this.setState({ model });
      }
    }

    render() {
      const { model } = this.state;
      return (
        <ul className={fullClassName}>
          <li><Button icon='add' onClick={() => this.createItem()} /></li>
          {model.map((item) => (
            <EditableListItem key={item[reactKey] || `temp-${item.$temp}`} model={item} 
              onSelect={() => this.selectItem(item)}
              onRemove={() => this.removeItem(item)} 
              onUpdate={(input) => this.updateItem(item, input)} />
          ))}
        </ul>
      );
    }
  }
  return EditableList;
}
