import React        from "react";
import shallowEqual from "react-pure-render/shallowEqual"

export default class Element extends React.Component {
    static propTypes = {
        element: React.PropTypes.shape({
            classes: React.PropTypes.array,
            category: React.PropTypes.string,
            name: React.PropTypes.string,
            symbol: React.PropTypes.string,
            number: React.PropTypes.number,
            weight: React.PropTypes.number,
            degree: React.PropTypes.string,
            id: React.PropTypes.string
        })
    };
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps);
    }
    render() {
        // Setting the id is so we can quickly lookup an element to tell Isotope to add/remove it
        return (
            <div id={this.props.element.id}
                 className={`element-item ${this.props.element.classes.join(' ')}`}
                 data-category={this.props.element.category}>
                 <h3 className="name">
                    <p className="major">{this.props.element.category}</p>
                    <p>{this.props.element.degree}</p>
                </h3>
                <p className="number">{this.props.element.number}</p>
                <p className="symbol">{this.props.element.symbol}</p>
                <p className="weight"> </p>
            </div>
        );
    }
}
