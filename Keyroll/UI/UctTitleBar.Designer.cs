namespace Keyroll.UI
{
    partial class UctTitleBar
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.BtClose = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // BtClose
            // 
            this.BtClose.BackColor = System.Drawing.Color.Violet;
            this.BtClose.Dock = System.Windows.Forms.DockStyle.Right;
            this.BtClose.Location = new System.Drawing.Point(350, 0);
            this.BtClose.Name = "BtClose";
            this.BtClose.Size = new System.Drawing.Size(40, 24);
            this.BtClose.TabIndex = 0;
            this.BtClose.UseVisualStyleBackColor = false;
            // 
            // UctTitleBar
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Maroon;
            this.Controls.Add(this.BtClose);
            this.Name = "UctTitleBar";
            this.Size = new System.Drawing.Size(390, 24);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button BtClose;

    }
}
