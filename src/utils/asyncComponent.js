import React from 'react';

export default importComponent => {
    return class extends React.Component {
        state = {
            component: null
        }
        async componentDidMount() {
            let {default: component} = await importComponent();
            this.setState({
                component
            });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} ></C> : null;
        }
    };
};
