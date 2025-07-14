import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Search } from "lucide-react";
// import { Input } from "./ui/input";
import { navigationItems } from "./Navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useState } from "react";


interface option {
	name: string
}

const OptionsList = ({ items }) => {
	return (
		<Command className="rounded-lg border shadow-none">
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					{items.map((item, key) => {

						return (
							<CommandItem key={key}>
								{item}
							</CommandItem>
						)
					})}
				</CommandGroup>
			</CommandList>
		</ Command>
	)
}


const SearchInputModal = ({ onOpen, ref }) => {

	const [commands, setCommands] = useState<option[]>([])

	return (
		<Dialog open={onOpen} onOpenChange={onOpen}>
			<DialogTrigger ref={ref} asChild className="hidden">
				<Button className="flex justify-between items-center gap-5 bg-gray-50/90 hover:bg-gray-50/50 text-gray-300" >
					<Search size={18} className="" />
					<span
						className="border w-7 p-1.5 rounded-sm text-gray-400"
					>/</span>
				</Button>
			</DialogTrigger>
			<DialogContent className=" min-w-[650px]   sm:max-w-[425px] bg-[#f7f7f7]">
				<DialogHeader>
					<DialogTitle>Search</DialogTitle>
					<DialogDescription>
						Enter your search query below.
					</DialogDescription>
				</DialogHeader>
				<div className="w-full flex flex-col gap-2">
					<div className="w-auto flex justify-between items-center">
						<OptionsList items={commands.map(command => command.name)} />
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SearchInputModal;