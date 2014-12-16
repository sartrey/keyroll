namespace Keyroll
{
    partial class KeyUI
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
            this.TxtOldKey = new Sartrey.UI.WinForms.InputTextUI();
            this.TxtNewKey = new Sartrey.UI.WinForms.InputTextUI();
            this.BtnConfirm = new System.Windows.Forms.Button();
            this.BtnCancel = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // TxtOldKey
            // 
            this.TxtOldKey.BackColor = System.Drawing.Color.Transparent;
            this.TxtOldKey.Dock = System.Windows.Forms.DockStyle.Top;
            this.TxtOldKey.InputText = "";
            this.TxtOldKey.LabelText = "Old Key";
            this.TxtOldKey.LabelWidth = 50;
            this.TxtOldKey.Location = new System.Drawing.Point(10, 10);
            this.TxtOldKey.Name = "TxtOldKey";
            this.TxtOldKey.OldText = "";
            this.TxtOldKey.Padding = new System.Windows.Forms.Padding(3);
            this.TxtOldKey.PasswordText = '*';
            this.TxtOldKey.Size = new System.Drawing.Size(280, 27);
            this.TxtOldKey.TabIndex = 0;
            // 
            // TxtNewKey
            // 
            this.TxtNewKey.BackColor = System.Drawing.Color.Transparent;
            this.TxtNewKey.Dock = System.Windows.Forms.DockStyle.Top;
            this.TxtNewKey.InputText = "";
            this.TxtNewKey.LabelText = "New Key";
            this.TxtNewKey.LabelWidth = 50;
            this.TxtNewKey.Location = new System.Drawing.Point(10, 37);
            this.TxtNewKey.Name = "TxtNewKey";
            this.TxtNewKey.OldText = "";
            this.TxtNewKey.Padding = new System.Windows.Forms.Padding(3, 3, 3, 10);
            this.TxtNewKey.PasswordText = '*';
            this.TxtNewKey.Size = new System.Drawing.Size(280, 34);
            this.TxtNewKey.TabIndex = 1;
            // 
            // BtnConfirm
            // 
            this.BtnConfirm.Dock = System.Windows.Forms.DockStyle.Left;
            this.BtnConfirm.Location = new System.Drawing.Point(10, 71);
            this.BtnConfirm.Name = "BtnConfirm";
            this.BtnConfirm.Size = new System.Drawing.Size(200, 34);
            this.BtnConfirm.TabIndex = 3;
            this.BtnConfirm.Text = "Confirm";
            this.BtnConfirm.UseVisualStyleBackColor = true;
            this.BtnConfirm.Click += new System.EventHandler(this.BtnConfirm_Click);
            // 
            // BtnCancel
            // 
            this.BtnCancel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.BtnCancel.Location = new System.Drawing.Point(210, 71);
            this.BtnCancel.Name = "BtnCancel";
            this.BtnCancel.Size = new System.Drawing.Size(80, 34);
            this.BtnCancel.TabIndex = 4;
            this.BtnCancel.Text = "Cancel";
            this.BtnCancel.UseVisualStyleBackColor = true;
            this.BtnCancel.Click += new System.EventHandler(this.BtnCancel_Click);
            // 
            // KeyUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.BtnCancel);
            this.Controls.Add(this.BtnConfirm);
            this.Controls.Add(this.TxtNewKey);
            this.Controls.Add(this.TxtOldKey);
            this.Name = "KeyUI";
            this.Padding = new System.Windows.Forms.Padding(10);
            this.Size = new System.Drawing.Size(300, 115);
            this.ResumeLayout(false);

        }

        #endregion

        private Sartrey.UI.WinForms.InputTextUI TxtOldKey;
        private Sartrey.UI.WinForms.InputTextUI TxtNewKey;
        private System.Windows.Forms.Button BtnConfirm;
        private System.Windows.Forms.Button BtnCancel;
    }
}
