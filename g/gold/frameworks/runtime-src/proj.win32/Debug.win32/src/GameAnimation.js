/**
 *���������Ϸ�����Ĵ���
 */

//ը����ը
Boom = function(self)
{
    var boom = new cc.Sprite();
    boom.anchorX = 0.5;
    boom.anchorY = 0.5;
    moveNode(boom, cc.p(20, 15));
    gouzi.addChild(boom);

    //���ö�������ÿһ֡��ͼƬ
    var animation = new cc.Animation();

    for (var i = 1; i <= 6; i++)
    {
        var str = "res/texiao/baozha1/bz" + i + ".png";
        animation.addSpriteFrameWithFile(str);
    }

    //���ö����Ĳ����ٶ�
    animation.setDelayPerUnit(0.1);

    //��������װ��һ������
    var animate = new cc.Animate(animation);

    var seq = cc.sequence(
        animate,
        cc.callFunc(self.removeFromParent, boom),
        cc.callFunc(function ()
            {
                //��������
                self.schedule(self.shortenRope, 0.05);

                //������Ϸ��ɫҡ���ֵĶ���
                self.createPlayerAnimation();
            },
            self)
    );

    //���Ŷ���
    boom.runAction(seq);
}

//����ץס��ʯʱ�Ķ���
playGrabAnimation = function(self)
{
    var sprite = new cc.Sprite();
    moveNode(sprite, cc.p(20, 0));
    gouzi.addChild(sprite);

    //���ö�������ÿһ֡��ͼƬ
    var animation = new cc.Animation();

    for (var i = 1; i <= 5; i++)
    {
        var str = "res/texiao/zhuagou/zhuagou" + i + ".png";
        animation.addSpriteFrameWithFile(str);
    }

    //���ö����Ĳ����ٶ�
    animation.setDelayPerUnit(0.1);
    var animate = new cc.Animate(animation);

    var seq = cc.sequence(
        animate,
        cc.callFunc(self.removeMineral, self, sprite)
    );

    //���Ŷ���
    sprite.runAction(seq);
}

//�����ӷֶ���
createAddScoreAnimation = function(self)
{
    var sprite = new cc.Sprite(res.add_png);
    sprite.x = width - 300;
    sprite.y = height - 200;
    moveNode(sprite, cc.p(0, 0));
    self.addChild(sprite);

    var mineral = gouzi.getChildByTag(1);

    //����һ��Atlas����
    var label = new cc.LabelAtlas("500", res.daojushuzi_png, 25, 36, '0');
    label.anchorX = 0;
    label.anchorY = 0.5;
    moveNode(label, cc.p(25, 15));
    label.setString(arrayScore[mineral.type]);
    sprite.addChild(label);

    var seq = cc.sequence(
        new cc.MoveBy(1, cc.p(0, 100)),
        cc.callFunc(self.removeFromParent, sprite)
    );

    sprite.runAction(seq);
}

//������Ϸ��Ҫ����ʱ����ʾ����
playWarningAnimation = function(self)
{
    var sprite = new cc.Sprite();
    sprite.x = 65;
    sprite.y = height - 60;
    moveNode(sprite, cc.p(-30, 18));
    self.addChild(sprite);

    //���ö�������ÿһ֡��ͼƬ
    var spriteAnima = new cc.Animation();

    for(var i = 1; i <=  6; i++)
    {
        var str = "res/texiao/daoshu/daoshu" + i + ".png";

        spriteAnima.addSpriteFrameWithFile(str);
    }

    //ÿһ֡���ŵļ��
    spriteAnima.setDelayPerUnit(0.1);

    //�Ƿ�ص���һ֡����
    spriteAnima.setRestoreOriginalFrame(false);

    var animate = new cc.Animate(spriteAnima);

    var seq = cc.sequence(
        animate,
        cc.callFunc(self.removeFromParent, sprite)
    );

    //���Ŷ���
    sprite.runAction(seq);
}