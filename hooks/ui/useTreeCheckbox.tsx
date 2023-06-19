import _ from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export type DataNode = {
  name?: string;
  label?: string;
  disabled?: boolean
  isChecked: boolean
  /** Id는 반드시 Unique */
  id: string;
  indeterminate?: boolean,
  children?: DataNode[]
  [key: string]: unknown
  /** Update Status 조건 */
  updateCondition?: (nodeData: DataNode) => boolean
}

/**
 * 컴포넌트 Property {@link TreeCheckbox}
 */
interface TreeCheckboxProps {
  data: DataNode
}

/**
 * Tree Checkbox Hooks
 * @param data Tree Data Node
 * @returns Checkbox Click 콜백, 신규 Tree Data Node
 */
function useTreeCheckbox({ data }: TreeCheckboxProps) {
  const [treeNode, setTreeNode] = useState<DataNode>(data)
  const { setValue } = useFormContext()

  /**
   * (React-Hook-Form) Field Name에 해당하는 값 초기화
   * @param node
   */
  const setAllNameValue = useCallback((node: DataNode) => {
    const { children, name, isChecked } = node

    children?.forEach((item) => setAllNameValue(item))

    if (!name) {
      return
    }

    setValue?.(name, isChecked)
  }, [setValue])

  /**
   * 기존 TreeNode에서 바뀐 TreeNode로 교체
   * @param parentNode 부모 노드
   * @param newChildNode 교체 노드
   * @returns 새로운 노드
   */
  const replaceChildNode = useCallback((parentNode: DataNode, newChildNode: DataNode) => {
    const { id: targetId } = newChildNode
    const { id, children } = parentNode

    if (targetId === id) {
      parentNode = newChildNode
    }

    children?.map((child, idx) => {
      if (child.id === targetId) { // replace
        parentNode.children?.splice(idx, 1, newChildNode)
      }

      return child
    })

    children?.forEach((child) => {
      replaceChildNode(child, newChildNode)
    })

    return parentNode
  }, [])

  /**
   * 전체 Checkbox 상태 값 Update
   * - 현재 노드 Update (Default: 모든 자식이 Check인 경우 갱신)
   * @param node nodeDAta
   */
  const updateAllStatus = useCallback((node: DataNode) => {
    const { children, name, updateCondition } = node

    if (!children || !children?.length) {
      return
    }

    children?.forEach((item) => updateAllStatus(item))

    const isChildAllChecked = children.every((item) => item.isChecked)
    const isCheck = updateCondition ? updateCondition(node) : isChildAllChecked

    node.indeterminate = !isChildAllChecked && children.some((item) => item.isChecked)
    node.isChecked = isCheck

    if (!name) {
      return
    }

    setValue?.(name, isCheck)
  }, [setValue])

  useEffect(() => {
    setTreeNode(data)
    setAllNameValue(data)
    updateAllStatus(data)
  }, [data, setAllNameValue, updateAllStatus])

  /**
   * 하위 Checkbox 상태 값 변경
   * @param node 현재 Node 데이터
   */
  const changeChildrenStatus = useCallback((node: DataNode, checked: boolean) => {
    const { children, name } = node
    const targetChildren = children || []

    if (name) {
      setValue?.(name, checked)
    }

    node.isChecked = checked
    node.children = targetChildren.map((node) => changeChildrenStatus(node, checked))

    return node
  }, [setValue])

  /**
   * 체크 박스 클릭 시
   * @param node Data Node
   * @param checked 체크 유무
   */
  const handleClick = useCallback((node: DataNode, checked: boolean) => {
    const newChildNode = changeChildrenStatus(_.cloneDeep(node), checked) // 하위 상태 변경
    const cloneParent = _.cloneDeep(treeNode)
    const newTreeNode = replaceChildNode(cloneParent, newChildNode)

    updateAllStatus(newTreeNode)
    setTreeNode(_.cloneDeep(newTreeNode))
  }, [changeChildrenStatus, replaceChildNode, treeNode, updateAllStatus])

  return { handleClick, treeNode }
}

export default useTreeCheckbox
