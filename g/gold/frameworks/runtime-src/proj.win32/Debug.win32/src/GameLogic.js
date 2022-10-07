/**
 * �������Ϸ�߼���صĴ���
 */

//��Ӵ���
var addTouch = function(self)
{
    self.touchListener = cc.EventListener.create(
    {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,

        onTouchBegan: function (touch, event)
        {
            if (!isTouch)
            {
                return false;
            }

            if (effVolume)
            {
                cc.audioEngine.playEffect(res.sound015_mp3);
            }

            isTouch = false;
            self.unschedule(playShengZiAction);
            self.schedule(longRope, 0.05);

            return true;
        }.bind(self)
    });

    cc.eventManager.addListener(self.touchListener, self);
}

//����������͵������
var sumShengZiMinPoint = function()
{
    //�����������˶೤
    var length = shengziLength * anchorY + 30;

    //�����ӵĽǶ�ת���ɻ���
    var radians = cc.degreesToRadians(shengzi.getRotation());

    //���������ϵ���͵��x����
    minX = shengzi.x - length * Math.sin(radians);

    //�������ӵ���͵��y����
    minY = shengzi.y - length * Math.cos(radians);
}

//�ж������Ƿ������˴�������
var isOutofWindows = function(self)
{
    //������������˴�������
    if (minX <= 0 || minX >= width || minY <= 0 || minY >= height)
    {
        time++;

        //��֤isOutofWindowsֻ����һ��
        if (time != 1)
        {
            return;
        }

        //����ֹͣ����
        self.unschedule(longRope);

        //��������
        self.schedule(self.shortenRope, 0.05);

        //������Ϸ��ɫ�����ӵĶ���
        self.createPlayerAnimation();
    }
}

//��ҳʱ,ˢ��ҳ���ϵ�����
var updatePageData = function()
{
    //��������˵�0ҳ
    if (indexPage == 0)
    {
        //��������ҳ�ķ�ҳ��ť
        buttonPageLeft.visible = false;

        //��ʾ���ҷ�ҳ�ķ�ҳ��ť
        buttonPageRight.visible = true;
    }

    //��������˵�7ҳ
    if (indexPage == 7)
    {
        //��ʾ����ҳ�ķ�ҳ��ť
        buttonPageLeft.visible = true;

        //�������ҷ�ҳ�ķ�ҳ��ť
        buttonPageRight.visible = false;
    }

    //�����1��6ҳ֮��
    if (indexPage >= 1 && indexPage <= 6)
    {
        //��ʾ����ҳ�ķ�ҳ��ť
        buttonPageLeft.visible = true;

        //��ʾ���ҷ�ҳ�ķ�ҳ��ť
        buttonPageRight.visible = true;
    }

    //��ʾ��ҳ�ϵ�����
    spriteInfo.setTexture("res/help" + indexPage + ".png");

    for (var i = 0; i <= 7; i++)
    {
        var sprite = seekFromRootByName(helpDialog.node, "dian" + i);

        if (i == indexPage)
        {
            sprite.setTexture(res.pinkPoint_png);
        }
        else
        {
            sprite.setTexture(res.brownPoint_png);
        }
    }
}

//��ײ���
var collisionItem = function(self)
{
    //���������������еĿ�ʯ
    for (var i = 0; i < vecMineral.length; i++)
    {
        var ptNode = map.convertToNodeSpace(cc.p(minX, minY));

        //��ÿ�ʯ������
        var mineral = vecMineral[i];

        if (cc.rectContainsPoint(mineral.getBoundingBox(), ptNode))
        {
            //���������ץ�˿�ʯ
            if (isGouzi)
            {
                return;
            }

            //��ǹ�����ץ�˿�ʯ
            isGouzi = true;

            //����ֹͣ����
            self.unschedule(longRope);

            //�Ƴ���ͼ�ϵĿ�ʯ
            var type = mineral.type;
            vecMineral[i].removeFromParent();
            vecMineral[i] = undefined;
            vecMineral.splice(i,1);

            //���ץ������ըҩ
            if (type == 1)
            {
                if (effVolume)
                {
                    cc.audioEngine.playEffect(res.sound_bomb_mp3);
                }

                //����ը����ը����
                Boom(self);
            }
            //ץ���Ĳ���ըҩ
            else
            {
                if (effVolume)
                {
                    cc.audioEngine.playEffect(res.sound007_mp3);
                }
                //����һ����ʯ,���ҽ���ʯ���ڹ�����
                var tempMineral = new cc.Sprite("res/tmx/goods_" + type + ".png");

                tempMineral.anchorX = 0.5;
                tempMineral.anchorY = 1;
                moveNode(tempMineral, cc.p(20, 15));
                tempMineral.setTag(1);
                tempMineral.type = type;
                tempMineral.setLocalZOrder(-1);
                gouzi.addChild(tempMineral);

                //����ץס��ʯʱ�Ķ���
                playGrabAnimation(self);


                //��������
                self.schedule(self.shortenRope, 0.05);
                if (repShengzi == null)
                {
                    self.createPlayerAnimation();
                }
            }
        }
    }
}

//��������
longRope = function()
{
    anchorY += 0.01;
    shengzi.anchorX = anchorX;
    shengzi.anchorY = anchorY;
}

//������������ҡ�ڵĶ���
playShengZiAction = function()
{
    //������ת�������ʱ
    if (shengziAngle >= 70)
    {
        //�����������ҡ��
        isDirection = true;
    }

    //������ת�����Ҷ�ʱ
    if (shengziAngle <= -70)
    {
        //�����������ҡ��
        isDirection = false;
    }

    //��������ҡ��
    if (isDirection)
    {
        shengziAngle -= 2;
        shengzi.rotation = shengziAngle;
    }
    //��������ҡ��
    else
    {
        shengziAngle += 2;
        shengzi.rotation = shengziAngle;
    }
}