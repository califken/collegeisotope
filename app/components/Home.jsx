import React                                from "react";
import shallowEqual                         from "react-pure-render/shallowEqual"
import { Grid, Button, ButtonGroup, Alert } from "react-bootstrap";

import IsotopeResponseRenderer  from "./IsotopeResponseRenderer.jsx";
import Element                  from "./Element.jsx";
import Spacer                   from "./Spacer";

// Flux
import ElementActions       from "../flux/actions/ElementActions";
import ElementStore         from "../flux/stores/ElementStore";
import FilterSortActions    from "../flux/actions/FilterSortActions";
import FilterSortStore      from "../flux/stores/FilterSortStore";
import connectToStores      from 'alt/utils/connectToStores';

// The Home.less contains the CSS as copied from the Isotope example @ http://codepen.io/desandro/pen/nFrte
require("./Home.less");

// Define data to drive the UI and Isotope.  This could/should be placed in a separate module.
const loadData = [
    {name: 'Associates', value: 'metal'},
    {name: 'Bachelors', value: 'iums'}
];
const sortData = [
    {name: 'Sort by', value: ''},
    {name: 'Major', value: 'name'},
    {name: 'School', value: 'symbol'},
    {name: 'Tuition', value: 'number'}
];
const filterData = [
    {name: 'show all', value: '*'},
    {name: 'Applied Science', value: '.Applied-Science'},
    {name: 'Arts', value: '.Arts'},
    {name: 'Arts in Education', value: '.Arts-in-Education'},
    {name: 'Business', value: '.Business'},
    {name: 'Fine Arts', value: '.Fine-Arts'},
    {name: 'General Studies', value: '.General-Studies'},
    {name: 'Global Management', value: '.Global-Management'},
    {name: 'Science', value: '.Science'},
    {name: 'Science in Design', value: '.Science-in-Design'},
    {name: 'Science in Education', value: '.Science-in-Education'},
    {name: 'Science in Engineering', value: '.Science-in-Engineering'}
];

@connectToStores
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    static getStores() {
        return [ElementStore, FilterSortStore];
    }
    static getPropsFromStores() {
        return _.assign(ElementStore.getState(), FilterSortStore.getState());
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
    renderElements(elements) {
        return _.map(elements, e => <Element key={e.name} element={e}></Element>);
    }
    filterElements(filter, e) {
        FilterSortActions.filter(filter);
    }
    sortElements(sort, e) {
        FilterSortActions.sort(sort);
    }
    renderLoadButtons() {
        return _.map(loadData, d => <Button key={d.name} active={this.props.type == d.value} onClick={ElementActions.loadElements.bind(this, d.value)}>{d.name}</Button>, this)
    }
    renderFilterButtons() {
        return _.map(filterData, d => <Button key={d.name} active={this.props.filter == d.value} onClick={this.filterElements.bind(this, d.value)}>{d.name}</Button>, this)
    }
    renderSortButtons() {
        return _.map(sortData, d => <Button key={d.name} active={this.props.sort == d.value} onClick={this.sortElements.bind(this, d.value)}>{d.name}</Button>, this)
    }
    renderNoData() {
        if (_.get(this, 'props.elements.length', 0) > 0) return null;
        return <Alert bsStyle="danger">To get started, please select a Bachelor or Associates degree.</Alert>
    }
    render() {
        return (
            <Grid fluid={true}>
                <h2>College Finder</h2>
                <p>Filter and Sort</p>
                <ButtonGroup>
                    {this.renderLoadButtons()}
                </ButtonGroup>
                <ButtonGroup>
                    {this.renderSortButtons()}
                </ButtonGroup>
                <ButtonGroup>
                    {this.renderFilterButtons()}
                </ButtonGroup>

                {this.renderNoData()}
                <IsotopeResponseRenderer>
                    {this.renderElements(this.props.elements)}
                </IsotopeResponseRenderer>
            </Grid>
        );
    }
}
