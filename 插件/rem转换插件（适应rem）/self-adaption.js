function Rem() {
			var docEl = document.documentElement,
				oSize = docEl.clientWidth / 7.5;

			if(oSize > 100) {
				oSize = 100; // ����remֵ 640 / 6.4 =100
			}

			docEl.style.fontSize = oSize + 'px';
		}
		window.addEventListener('resize', Rem, false);
		Rem();
		/*
		A: oSize = docEl.clientWidth/7.5; //��Ƹ�Ĭ��750px��ȣ�����7.5,�����Ƹ���640px��ȣ����7.5���޸�6.4

		B: if(oSize>85){
		oSize = 85; // ����remֵ 640 / 7.5 �� 85 
		}
		640��max-width:640px��������Ļ��ȣ�7.5����Ƹ���750px
		�����Ƹ��� 640px.�� 640/6.4����ȥ
		һ���ƶ���ҳ�� �� body�� ���� max-width:640px
		
		���ϼ�����δ��룬����д��λ��ʱ��ֱ�Ӱ���PSD����ı�׼��С����100���ɡ�
		�磺��ע28px.��д 0.28rem���ɣ�
		����Ӧ�������ԣ�beautiful!�ڸ����ն���ȫ����Ӧ��С���������磡
		 * */