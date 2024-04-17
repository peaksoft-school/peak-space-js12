// ModalProject.tsx
import React, { ReactNode, useState } from 'react';
import { Modal } from 'antd';
import scss from './Modal.module.scss'

interface ModalProps {
	title: string;
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
	children: ReactNode;
	className?: string;
}

const ModalProject: React.FC<ModalProps> = ({
	title,
	open,
	onOk,
	onCancel,
	children,
	className
}) => {
	return (
		<Modal
			className={`${scss.test} ${className}`}
			title={title}
			visible={open}
			onOk={onOk}
			onCancel={onCancel}
		>
			{children}
		</Modal>
	);
};

export default ModalProject;
