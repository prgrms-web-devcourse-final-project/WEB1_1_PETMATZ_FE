interface TabMenuProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function SOSTabMenu({ activeTab, onTabChange }: TabMenuProps) {
    const tabs = [
        { id: 'all', label: 'ALL' },
        { id: 'user', label: 'MY' },
    ];

    return (
        <ul className="flex flex-wrap px-[24px] pt-[16px] items-center text-label-l border-b border-point-200 font-extrabold">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={`py-[10px] px-[24px] cursor-pointer border-t border-l border-r border-point-200 rounded-t-lg ${activeTab === tab.id ? 'bg-point-200 text-gray-100' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </div>
            ))}
        </ul>
    );
}
