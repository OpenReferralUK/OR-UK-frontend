import React, { Component } from 'react';

export interface SideMenuProps {
    subMenu: array;
}

class componentName extends Component<SideMenuProps> {  	
  render() {
	const { subMenu } = this.props;
	if (!subMenu || subMenu.length === 0){
	  return;
	}
    return (
		<div className="col-2"><ul className="nav flex-column">
		{subMenu.map(function(name, index){
					return <li className="nav-item" key={subMenu[index].Link}><a className="nav-link" href={subMenu[index].Link}>{subMenu[index].Label}</a></li>;
		})}
		</ul></div>	
    );
  }
}

export default componentName;
