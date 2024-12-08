interface TabMenuProps {
    tabs: { id: 'DOL' | 'MAL'; label: string }[];
    activeTab: string;
    onTabChange: (tabId: 'DOL' | 'MAL') => void;
}

export default function PleaseTabMenu({
    tabs,
    activeTab,
    onTabChange,
}: TabMenuProps) {
    return (
        <ul className="flex flex-wrap px-[24px] pt-[16px] items-center text-label-l border-b border-point-500 font-extrabold">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={`py-[10px] px-[24px] cursor-pointer border-t border-l border-r border-point-500 rounded-t-lg ${activeTab === tab.id ? 'bg-point-500 text-white' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </div>
            ))}
        </ul>
    );
}
