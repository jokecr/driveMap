Component.driveRow = React.createClass({
  render: function() {
    return (<div className="driveRow">
      <div className="letter">{this.props.drive.name}</div>
      <div className="x">x</div>
      <div className="x">x</div>
      <div className="x">x</div>
      <div className="x">x</div>
      <div className="x">x</div>
      <div className="x">x</div>
      <div className="x">x</div>
</div>);
  }
});
Component.facility = React.createClass({
  render: function() {
    var rows = _.map(this.props.drives, function(drive) {
      return (
        <Component.driveRow drive={drive} />
      );
    })
    return (
      <div className="facility">
        <div className="facilityLabel">
          Name:{this.props.facility.name}
        </div>
        <div className="drives">{rows}</div>
      </div>
    );
  }
});
Component.facilities = React.createClass({
  getInitialState: function() {
    return {
      facilities: [{
        id: 1,
        name: "AT"
      }, {
        id: 2,
        name: "SP"
      }, {
        id: 3,
        name: "VC"
      }],
      drives: {
        1: [{
          name: 'a'
        }, {
          name: 'b'
        }, {
          name: 'c'
        }],
        2: [{
          name: 'a'
        }, {
          name: 'c'
        }],
        3: [{
          name: 'a'
        }, {
          name: 'b'
        }, {
          name: 'c'
        }]
      }
    };
  },
  render: function() {
    var rows = _.map(this.state.facilities, function(facility) {
      return (
        <Component.facility facility={facility} drives={this.state.drives[facility.id]} />
      );
    }.bind(this));
    return (
      <div>
        <div>Facilities</div>
        <div>{rows}</div>
      </div>
    );
  }
});
React.render(
  <Component.facilities />,
  document.getElementById('content')
);