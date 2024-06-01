  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Text from "./Text"
  
  export function Dropdown({icon,menu,title}) {
    return (
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button className="size-6 p-0 outline-none" variant="ghost">{icon}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel > <Text> {title}</Text>  </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
            {menu.map(menuItem => {
              return (
                <DropdownMenuItem key={menuItem.id}    className="flex items-center gap-4 hover:bg-secondary" >
                {menuItem.icon}
                <Text> {menuItem.title}</Text> 
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  