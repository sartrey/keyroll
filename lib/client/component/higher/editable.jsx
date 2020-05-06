import React, { Component } from 'react';

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
      const { model, selected } = this.props;
      const classes = [fullClassName];
      if (selected) classes.push('active');
      if (stage === 'editor') {
        return (
          <li className={classes.join(' ')}>
            <Editor model={model}
              onCancel={() => this.cancelInput()}
              onUpdate={() => this.raiseUpdate()}
              onChange={(key, value) => this.changeInput(key, value)} />
          </li>
        );
      }
      return (
        <li className={classes.join(' ')}>
          <Viewer model={model} selected={selected}
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
    HeaderView,
    FooterView
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
        model: props.model || [],
        query: {
          selectedItem: null
        }
      };
      this.idgen = 1;
      if (HeaderView) HeaderView.prototype.parent = this;
      if (FooterView) FooterView.prototype.parent = this;
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
      const { query } = this.state;
      query.selectedItem = item;
      this.setState({ query });
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
      const { model, query } = this.state;
      return (
        <div className={fullClassName}>
          { HeaderView && (<HeaderView />) }
          { model.length > 0 && (
            <ul>
            {model.map((item) => {
              const selected = item === query.selectedItem;
              return (
                <EditableListItem key={item[reactKey] || `temp-${item.$temp}`} model={item} selected={selected}
                  onSelect={() => this.selectItem(item)}
                  onRemove={() => this.removeItem(item)} 
                  onUpdate={(input) => this.updateItem(item, input)} />
              );
            })}
            </ul>
          ) }
          { FooterView && (<FooterView />) }
        </div>
      );
    }
  }
  return EditableList;
}
