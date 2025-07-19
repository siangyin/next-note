"use client"

interface ItemProps {
  onClick?: () => void
  label: string
  icon: React.ElementType
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const { onClick, label, icon: Icon } = props

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: "12px" }}
      className="cursor-pointer group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5
    flex items-center text-muted-foreground font-medium"
    >
      <Icon className="shrink-0 w-[18px] h-[18px] mr-2 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  )
}

export default Item
