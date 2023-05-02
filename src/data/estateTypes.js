/**
 * Valid estate types
 * @type {Array<{name: string, id: string}>}
 */
export const estateTypes = [
  {
    name: "Villa",
    id: "1",
  },
  {
    name: "Villalejlighed",
    id: "2",
  },
  {
    name: "Rækkehus",
    id: "3",
  },
  {
    name: "Ejerlejlighed",
    id: "4",
  },
  {
    name: "Fritidshus",
    id: "5",
  },
  {
    name: "Fritidsgrund",
    id: "6",
  },
  {
    name: "Helårsgrund",
    id: "7",
  },
  {
    name: "Andelsbolig",
    id: "8",
  },
  {
    name: "Landejendom",
    id: "9",
  },
  /*  {
    name: "testing",
    id: "10",
  }, */
];

export function getEstateName(eid) {
  //in the array find the id that is equal to this entry's id
  const eStateType = estateTypes.find((eStateType) => eStateType.id == eid);
  // console.log(eStateType.name);
  // console.log("eStateType.name: ", eStateType.name);
  return eStateType.name;
}
