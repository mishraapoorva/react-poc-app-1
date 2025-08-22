import React, { useRef } from "react";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

export default function Banner() {
  const menu = useRef(null);
  const items = [
    { label: 'Profile', icon: 'pi pi-fw pi-user' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-fw pi-power-off' }
  ];

  const startContent = (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-2xl bg-primary" />
      <h1 className="text-xl font-bold m-0">SEN Platform</h1>
      <Tag value="POC" />
    </div>
  );

  const endContent = (
    <div className="flex items-center gap-3">
      <Button icon="pi pi-bell" rounded text severity="secondary" aria-label="Notifications" />
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Button
        onClick={(event) => menu.current.toggle(event)}
        aria-controls="popup_menu"
        aria-haspopup
        className="flex items-center gap-2"
      >
        <Avatar icon="pi pi-user" shape="circle" />
        <span className="text-sm font-medium">Apoorva</span>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-20">
      <Toolbar start={startContent} end={endContent} className="px-6 py-4" />
    </header>
  );
}
